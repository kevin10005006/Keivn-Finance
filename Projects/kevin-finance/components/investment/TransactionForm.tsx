import { Button, Input} from "@/components/ui";

export default function TransactionForm() {
  return (
    <form className="space-y-4">
      <Input label="交易日期" type="date" />
      <Input label="成交價格" type="number" step="0.01"/>
      <Input label="股數" type="number" />
      <Input label="手續費" type="number" />
      <Input label="備註" />

      <div className="flex justify-end gap-3">
        <Button variant="primary" type="submit">儲存</Button>
      </div>
    </form>
  );
}