import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { StockOperationApi } from '#/api/stock/operation';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'stockName',
      label: $t('stock.operation.stockName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'stockCode',
      label: $t('stock.operation.stockCode'),
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'buyAmount',
      label: $t('stock.operation.buyAmount'),
      rules: 'required',
    },
    {
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
      fieldName: 'buyDate',
      label: $t('stock.operation.buyDate'),
      rules: 'required',
    },
    {
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
      fieldName: 'sellDate',
      label: $t('stock.operation.sellDate'),
    },
    {
      component: 'Input',
      fieldName: 'buyReason',
      label: $t('stock.operation.buyReason'),
    },
    {
      component: 'Input',
      fieldName: 'sellReason',
      label: $t('stock.operation.sellReason'),
    },
    {
      component: 'InputNumber',
      fieldName: 'profit',
      label: $t('stock.operation.profit'),
    },
    {
      component: 'Switch',
      fieldName: 'isSimulation',
      label: $t('stock.operation.isSimulation'),
    },
    {
      component: 'Input',
      fieldName: 'pattern',
      label: $t('stock.operation.pattern'),
    },
    {
      component: 'Input',
      fieldName: 'summary',
      label: $t('stock.operation.summary'),
    },
    {
      component: 'Input',
      fieldName: 'type',
      label: $t('stock.operation.type'),
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'stockName',
      label: $t('stock.operation.stockName'),
    },
    {
      component: 'Input',
      fieldName: 'stockCode',
      label: $t('stock.operation.stockCode'),
    },
    {
      component: 'InputNumber',
      fieldName: 'buyAmount',
      label: $t('stock.operation.buyAmount'),
    },
    {
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
      fieldName: 'buyDate',
      label: $t('stock.operation.buyDate'),
    },
    {
      component: 'DatePicker',
      componentProps: {
        showTime: true,
      },
      fieldName: 'sellDate',
      label: $t('stock.operation.sellDate'),
    },
    {
      component: 'Input',
      fieldName: 'pattern',
      label: $t('stock.operation.pattern'),
    },
    {
      component: 'Input',
      fieldName: 'type',
      label: $t('stock.operation.type'),
    },
  ];
}

export function useColumns<T = StockOperationApi.StockOperation>(
  onActionClick: OnActionClickFn<T>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'stockName',
      title: $t('stock.operation.stockName'),
      width: 200,
    },
    {
      field: 'stockCode',
      title: $t('stock.operation.stockCode'),
      width: 200,
    },
    {
      field: 'buyAmount',
      title: $t('stock.operation.buyAmount'),
      width: 150,
    },
    {
      field: 'buyDate',
      title: $t('stock.operation.buyDate'),
      width: 200,
    },
    {
      field: 'sellDate',
      title: $t('stock.operation.sellDate'),
      width: 200,
    },
    {
      field: 'buyReason',
      title: $t('stock.operation.buyReason'),
      width: 200,
    },
    {
      field: 'sellReason',
      title: $t('stock.operation.sellReason'),
      width: 200,
    },
    {
      field: 'profit',
      title: $t('stock.operation.profit'),
      width: 150,
    },
    {
      field: 'isSimulation',
      title: $t('stock.operation.isSimulation'),
      width: 150,
    },
    {
      field: 'pattern',
      title: $t('stock.operation.pattern'),
      width: 150,
    },
    {
      field: 'summary',
      title: $t('stock.operation.summary'),
      width: 200,
    },
    {
      field: 'type',
      title: $t('stock.operation.type'),
      width: 150,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'stockName',
          nameTitle: $t('stock.operation.stockName'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
    },
  ];
}
