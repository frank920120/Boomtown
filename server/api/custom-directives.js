const { defaultFieldResolver } = require('graphql');
const { ForbiddenError } = require('apollo-server-express');
const { SchemaDirectiveVisitor } = require('graphql-tools');

class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    this.ensureFieldsWrapped(type);
  }
  // Visitor methods for nested types like fields and arguments

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);
  }

  ensureFieldsWrapped(objectType) {
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(parent, args, context, info) {
        const { token, req } = context;
        if (
          !token &&
          req.body.operationName !== 'login' &&
          req.body.operationName !== 'signup'
        ) {
          throw new Error('Not Authorized (@auth)');
        }

        return resolve.apply(this, [parent, args, context, info]);
      };
    });
  }
}

module.exports = {
  AuthDirective
};
