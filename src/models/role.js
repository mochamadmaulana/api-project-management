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
  };

	return Role;
}