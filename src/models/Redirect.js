import { DataTypes } from 'sequelize';
import sequelize from '../lib/db.js';

function normalizeSourcePath(value) {
  let normalized = String(value || '').trim();
  if (!normalized) return '/';

  try {
    if (/^https?:\/\//i.test(normalized)) {
      normalized = new URL(normalized).pathname || '/';
    }
  } catch {
    // Ignore URL parsing errors and continue normalization as plain path.
  }

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  normalized = normalized.replace(/\/{2,}/g, '/');

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '');
  }

  return normalized.toLowerCase();
}

const Redirect = sequelize.define(
  'redirects',
  {
    sourcePath: {
      type: DataTypes.STRING(512),
      allowNull: false,
      unique: true,
    },
    destinationUrl: {
      type: DataTypes.STRING(2048),
      allowNull: false,
    },
    isPermanent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    notes: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (redirect) => {
        if (redirect.sourcePath) {
          redirect.sourcePath = normalizeSourcePath(redirect.sourcePath);
        }

        if (typeof redirect.destinationUrl === 'string') {
          redirect.destinationUrl = redirect.destinationUrl.trim();
        }
      },
    },
  },
);

export default Redirect;
