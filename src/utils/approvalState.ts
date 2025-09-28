const DRAFT = { code: 10, name: "草稿" };
const HANDLING = { code: 20, name: "处理中" };
const REJECTED = { code: 30, name: "已拒绝" };
const APPROVED = { code: 40, name: "已通过" };
const HANDLED = { code: 50, name: "已处理" };
const CANCEL = { code: 100, name: "已取消" };

export const IntentionHandleState = { DRAFT, HANDLING, REJECTED, APPROVED, HANDLED, CANCEL };
const IntentionHandleStateMap = new Map<number, string>();
for (const entry of Object.entries(IntentionHandleState)) {
  const t = entry[1];
  IntentionHandleStateMap.set(t.code, t.name);
}

export const GetIntentionHandleStateName = (code: number) => {
  return IntentionHandleStateMap.get(code) ?? '';
}
