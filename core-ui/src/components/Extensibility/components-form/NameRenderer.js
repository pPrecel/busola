import React from 'react';
import { List } from 'immutable';

import { K8sNameField } from 'shared/ResourceForm/fields';

export function NameRenderer({
  storeKeys,
  resource,
  value,
  onChange,
  schema,
  required,
  ...props
}) {
  const extraPaths = schema.get('extraPaths')?.toJS() || [];
  const showHelp = schema.toJS()?.showHelp ?? true;
  const schemaRequired = schema.get('required');

  return (
    <K8sNameField
      value={value}
      kind={resource.kind}
      setValue={value => {
        onChange([
          {
            storeKeys,
            scopes: ['value'],
            type: 'set',
            schema,
            required,
            data: { value },
          },
          ...extraPaths.map(path => ({
            storeKeys: List(Array.isArray(path) ? path : path.split('.')),
            scopes: ['value'],
            type: 'set',
            schema,
            required,
            data: { value },
          })),
        ]);
      }}
      validate={value => !!value}
      required={schemaRequired ?? required}
      showHelp={showHelp}
    />
  );
}
