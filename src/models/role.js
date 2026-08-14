const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	const Role = sequelize.define('Role', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
      allowNull: false,
      unique: true
		},
		company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
	}, {
		tableName: 'roles',
		timestamps: true,
		paranoid: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
		deletedAt: 'deleted_at',

		scopes: {
			onlyDeleted: {
				paranoid: false,
				where: {
					deleted_at: {
						[Op.not]: null
					}
				}
			}
		}
	});

	Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: 'role_id',
      as: 'users'
    });

		Role.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company'
    });
  };

	return Role;
}