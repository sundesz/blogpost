import { DataTypes, Model } from 'sequelize';
import { IBlog, IBlogInput } from '../../types/blogs';
import { sequelize } from '../index';

class Blog extends Model<IBlog, IBlogInput> implements IBlog {
  public blogId!: string;
  public userId!: string;
  public title!: string;
  public content!: string;
  public slug!: string;
  public published!: boolean;
  public passive!: boolean;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Blog.init(
  {
    blogId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    passive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: 'User',
        key: 'userId',
      },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'blog',
  }
);

export default Blog;
