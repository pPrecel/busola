import React from 'react';

import { ResourceForm } from 'shared/ResourceForm';
import * as Inputs from 'shared/ResourceForm/inputs';
import { useGetTranslation } from 'components/Extensibility/helpers';

export function StringRenderer({
  onChange,
  onKeyDown,
  value,
  schema,
  storeKeys,
  required,
  compact,
  placeholder,
  ...props
}) {
  const { tFromStoreKeys, t: tExt } = useGetTranslation();

  const getTypeSpecificProps = () => {
    if (schema.get('enum')) {
      const options = schema.toJS().enum.map(key => ({ key, text: key }));
      return { input: Inputs.ComboboxInput, options };
    } else {
      return { input: Inputs.Text };
    }
  };

  const schemaPlaceholder = schema.get('placeholder');
  const schemaRequired = schema.get('required');

  return (
    <ResourceForm.FormField
      value={value}
      setValue={value => {
        onChange({
          storeKeys,
          scopes: ['value'],
          type: 'set',
          schema,
          required,
          data: { value },
        });
      }}
      label={tFromStoreKeys(storeKeys, schema)}
      placeholder={schemaPlaceholder ? tExt(schemaPlaceholder) : placeholder}
      compact={compact}
      required={schemaRequired ?? required}
      data-testid={storeKeys.join('.')}
      {...getTypeSpecificProps()}
    />
  );
}
