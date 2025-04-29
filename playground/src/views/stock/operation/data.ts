import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';
import type { StockOperationApi } from '#/api/stock/operation';

import { h, ref } from 'vue';

import { useDebounceFn } from '@vueuse/core';
import { Spin } from 'ant-design-vue';

import { $t } from '#/locales';

const keyword = ref('');
const fetching = ref(false);

// 模拟远程获取数据
function fetchRemoteOptions({ keyword = '选项' }: Record<string, any>) {
  fetching.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = Array.from({ length: 10 }).map((_, index) => ({
        label: `${keyword}-${index}`,
        value: `${keyword}-${index}`,
      }));
      resolve(options);
      fetching.value = false;
    }, 1000);
  });
}

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'ApiSelect',
      // 对应组件的参数
      componentProps: () => {
        return {
          api: fetchRemoteOptions,
          // 禁止本地过滤
          filterOption: false,
          // 如果正在获取数据，使用插槽显示一个loading
          notFoundContent: fetching.value ? undefined : null,
          // 搜索词变化时记录下来， 使用useDebounceFn防抖。
          onSearch: useDebounceFn((value: string) => {
            keyword.value = value;
          }, 300),
          // 远程搜索参数。当搜索词变化时，params也会更新
          params: {
            keyword: keyword.value || undefined,
          },
          showSearch: true,
        };
      },
      // 字段名
      fieldName: 'stockCode',
      // 界面显示的label
      label: '股票',
      renderComponentContent: () => {
        return {
          notFoundContent: fetching.value ? h(Spin) : undefined,
        };
      },
      rules: 'selectRequired',
    },
    {
      component: 'InputNumber',
      fieldName: 'buyAmount',
      label: $t('stock.operation.buyAmount'),
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'profit',
      label: $t('stock.operation.profit'),
      rules: 'required',
    },
    {
      component: 'RangePicker',
      fieldName: 'rangeTradeDate',
      label: $t('stock.operation.rangeTradeDate'),
      rules: 'required',
    },
    {
      component: 'Textarea',
      componentProps: {
        allowClear: true,
        autoSize: {
          minRows: 3,
        },
      },
      fieldName: 'buyReason',
      label: $t('stock.operation.buyReason'),
    },
    {
      component: 'Textarea',
      componentProps: {
        allowClear: true,
        autoSize: {
          minRows: 3,
        },
      },
      fieldName: 'sellReason',
      label: $t('stock.operation.sellReason'),
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
    {
      component: 'Rate',
      componentProps: {
        allowClear: true,
        allowHalf: true,
        count: 5,
      },
      fieldName: 'rate',
      label: '可复制程度',
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
