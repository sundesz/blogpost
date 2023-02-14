import { message } from '../../src/utils/notificationMessage';

interface ISignUp {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

// TODO:: save SERVER_BASE_URL in env file
const SERVER_BASE_URL = 'http://localhost:8080/api/v1';

const authorUser: ISignUp = {
  name: 'test author',
  email: 'test@author1.fi',
  role: 'author',
  password: 'test123456',
  confirmPassword: 'test123456',
};

const authorUser2: ISignUp = {
  name: 'test author 2',
  email: 'test@author2.fi',
  role: 'author',
  password: 'test123456',
  confirmPassword: 'test123456',
};

const adminUser: ISignUp = {
  name: 'admin',
  email: 'admin@admin.fi',
  role: 'admin',
  password: 'admin',
  confirmPassword: 'admin',
};

const testBlog = {
  title: 'Test blog',
  slug: 'test-blog',
  published: true,
  content: 'Lorem Ipsum is simply a dummy text',
};

const testComment = {
  title: 'test comment',
  content: 'test content',
  rating: 4,
};

describe('Blogpost app', function () {
  beforeEach(function () {
    cy.request('POST', `${SERVER_BASE_URL}/test/reset`);
    cy.visit('/');
  });

  it('front page can be opened', function () {
    cy.contains('Welcome to Blog post App');
  });

  it('user can be created', function () {
    cy.visit('/');
    cy.get('#signup-link').click();
    cy.get('#name').type(authorUser.name);
    cy.get('#email').type(authorUser.email);
    cy.get('#password').type(authorUser.password);
    cy.get('#confirmPassword').type(authorUser.confirmPassword);
    cy.get('#role').select(authorUser.role);
    cy.get('#signup-btn').click();

    cy.contains(message.SUCCESS.CREATE_USER);
  });

  describe('when there is a user', function () {
    beforeEach(function () {
      cy.createUser(authorUser);
      cy.visit('/');
    });

    it('can signin', function () {
      cy.get('#signin-link').click();
      cy.get('#username').type(authorUser.email);
      cy.get('#password').type(authorUser.password);
      cy.get('#signin-btn').click();

      cy.contains(authorUser.email);
    });

    describe('when user sign in', function () {
      beforeEach(function () {
        cy.get('#signin-link').click();
        cy.get('#username').type(authorUser.email);
        cy.get('#password').type(authorUser.password);
        cy.get('#signin-btn').click();
        cy.visit('/');
      });

      it('failed create a blog when no title', function () {
        cy.get('#new-blog-link').click();
        cy.get('#create-blog-btn').click();
        cy.contains('Title is required');
      });

      it('failed create a blog when title is less than 4 character', function () {
        cy.get('#new-blog-link').click();
        cy.get('#title').type('Tes');
        cy.get('#create-blog-btn').click();
        cy.contains('Title must be at least 4 character long');
      });

      it('failed create a blog when title is greater than 60 character', function () {
        cy.get('#new-blog-link').click();
        cy.get('#title').type(
          'Tes 123456789101112131415161718192021222324252627282930313233'
        );
        cy.get('#create-blog-btn').click();
        cy.contains('Title should be less than 60 characters long');
      });

      it('failed create a blog when no content', function () {
        cy.get('#new-blog-link').click();
        cy.get('#title').type('Test blog');
        cy.get('#create-blog-btn').click();
        cy.contains('Content is required');
      });

      it('can create a blog', function () {
        cy.get('#new-blog-link').click();
        cy.get('#title').type(testBlog.title);
        cy.get('#content').type(testBlog.content);
        cy.get('#create-blog-btn').click();
        cy.contains(message.SUCCESS.CREATE_BLOG);
      });

      describe('when there is a blog and a user', function () {
        beforeEach(function () {
          cy.request('POST', `${SERVER_BASE_URL}/blogs`, {
            title: testBlog.title,
            slug: testBlog.slug,
            content: testBlog.content,
            published: true,
          });

          cy.visit(`/blogs/${testBlog.slug}`);
        });

        it('can update a blog', function () {
          cy.get('#edit-btn').click();
          cy.get('#content').type(' edit blog');
          cy.get('#update-blog-btn').click();
          cy.contains(testBlog.content + ' edit blog');
        });

        it('cannot comment on own blog', function () {
          cy.get('#comment-btn').should('not.exist');
        });

        it('cannot react on own blog', function () {
          cy.get('#wow-btn').click();
          cy.get('#wow-btn').contains('0');
        });

        describe('when there is a blog and two user', function () {
          beforeEach(function () {
            cy.createUser(authorUser2);

            cy.get('#signout-link').click();

            cy.get('#signin-link').click();
            cy.get('#username').type(authorUser2.email);
            cy.get('#password').type(authorUser2.password);
            cy.get('#signin-btn').click();
            cy.visit(`/blogs/${testBlog.slug}`);
          });

          it('can comment a blog', function () {
            cy.get('#comment-btn').click();
            cy.get('#title').type(testComment.title);
            cy.get('#content').type(testComment.content);
            cy.get('#rating').select(testComment.rating);
            cy.get('#create-comment-btn').click();
            cy.contains(testComment.title);
          });

          it('can react a blog', function () {
            cy.get('#wow-btn').click();
            cy.get('#wow-btn').contains('1');
          });

          describe('admin user', function () {
            beforeEach(function () {
              cy.createUser(adminUser);

              cy.get('#signout-link').click();

              cy.get('#signin-link').click();
              cy.get('#username').type(adminUser.email);
              cy.get('#password').type(adminUser.password);
              cy.get('#signin-btn').click();
              cy.visit(`/blogs/${testBlog.slug}`);
            });

            it('can unpublished a blog', function () {
              cy.get('#edit-btn').click();
              cy.get('#published').uncheck();
              cy.get('#update-blog-btn').click();
              cy.contains('No blog yet.');
            });

            it('can change author', function () {
              cy.contains(`by ${authorUser.name}`);
              cy.get('#edit-btn').click();
              cy.get('#author option')
                .last()
                .then(($lastOption) => {
                  cy.get('#author').select($lastOption.text());
                });

              cy.get('#update-blog-btn').click();
              cy.contains(`by ${authorUser2.name}`);
            });
          });
        });
      });
    });
  });
});
