import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace StockOperationApi {
  export interface StockOperation {
    [key: string]: any;
    buyAmount: number; // 买入金额
    buyDate: string; // 买入日期
    buyReason: string; // 买入原因
    id: string; // 股票操作ID
    isSimulation: boolean; // 是否模拟盘
    pattern: string; // 模式
    profit: number; // 收益
    sellDate: string; // 卖出日期
    sellReason: string; // 卖出原因
    stockCode: string; // 股票代码
    stockName: string; // 股票名称
    summary: string; // 总结
    type: string; // 类型
  }
}

/**
 * 获取股票操作列表数据
 */
async function getStockOperationList(params: Recordable<any>) {
  return requestClient.get<Array<StockOperationApi.StockOperation>>(
    '/stock/operation/list',
    { params },
  );
}

/**
 * 创建股票操作
 * @param data 股票操作数据
 */
async function createStockOperation(
  data: Omit<StockOperationApi.StockOperation, 'id'>,
) {
  return requestClient.post('/stock/operation', data);
}

/**
 * 更新股票操作
 *
 * @param id 股票操作 ID
 * @param data 股票操作数据
 */
async function updateStockOperation(
  id: string,
  data: Omit<StockOperationApi.StockOperation, 'id'>,
) {
  return requestClient.put(`/stock/operation/${id}`, data);
}

/**
 * 删除股票操作
 * @param id 股票操作 ID
 */
async function deleteStockOperation(id: string) {
  return requestClient.delete(`/stock/operation/${id}`);
}

export {
  createStockOperation,
  deleteStockOperation,
  getStockOperationList,
  updateStockOperation,
};
