import { DataTypes } from "sequelize";
import sequelize from "../lib/db.js";

/*
import mongoose from 'mongoose';

const AcademicSidebarLinkSchema = new mongoose.Schema({
  label: { type: String, required: true },
  icon: { type: String, required: true },
  slug: { type: String, required: true },
  colorClass: { type: String, required: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.AcademicSidebarLink || mongoose.model('AcademicSidebarLink', AcademicSidebarLinkSchema);
*/

const AcademicSidebarLink = sequelize.define(
  "academicsidebarlinks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorClass: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default AcademicSidebarLink;
