import $ from 'jquery';
import { bitable } from '@base-open/web-api';
import './index.scss';

$(async function() {
  const [tableList, selection] = await Promise.all([bitable.base.getTableMetaList(), bitable.base.getSelection()]);
  const optionsHtml = tableList.map(table => {
    return `<option value="${table.id}">${table.name}</option>`;
  }).join('');
  $('#tableSelect').append(optionsHtml).val(selection.tableId!);
  $('#addRecord').on('click', async function() {
    const tableId = $('#tableSelect').val();
    if (tableId) {
      const table = await bitable.base.getTableById(tableId as string);
      table.addRecord({
        fields: {},
      });
    }
  });
});