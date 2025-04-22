import { faker } from '@faker-js/faker';
import { verifyAccessToken } from '~/utils/jwt-utils';
import { unAuthorizedResponse, usePageResponseSuccess } from '~/utils/response';

// 新增：生成模拟数据的函数
function generateMockDataList(count: number) {
  const dataList = [];

  for (let i = 0; i < count; i++) {
    const dataItem = {
      id: faker.string.uuid(),
      stockName: faker.company.name(),
      stockCode: faker.finance.currencyCode(),
      buyAmount: faker.number.float({ min: 100, max: 10_000 }),
      buyDate: faker.date.past().toLocaleDateString(),
      buyReason: faker.lorem.sentence(),
      sellDate: faker.date.future().toLocaleDateString(),
      sellReason: faker.lorem.sentence(),
      profit: faker.number.float({ min: -1000, max: 1000 }),
      isSimulation: faker.datatype.boolean(),
      pattern: faker.helpers.arrayElement(['短线', '中线', '长线']),
      summary: faker.lorem.paragraph(),
      type: faker.helpers.arrayElement(['买入', '卖出', '持有']),
    };

    dataList.push(dataItem);
  }

  return dataList;
}

const mockData = generateMockDataList(100); // 生成 100 条模拟数据

export default eventHandler(async (event) => {
  const userinfo = verifyAccessToken(event);
  if (!userinfo) {
    return unAuthorizedResponse(event);
  }

  const { page = 1, pageSize = 20 } = getQuery(event);
  const listData = structuredClone(mockData);

  // 分页逻辑
  const start = (Number(page) - 1) * Number(pageSize);
  const end = start + Number(pageSize);
  const paginatedData = listData.slice(start, end);

  return usePageResponseSuccess(
    page as string,
    pageSize as string,
    paginatedData,
  );
});
