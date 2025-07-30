export default function getStatusColor(status: string): string {
  return {
    completed: "bg-green-100  text-green-600 px-2 py-1 rounded-xl my-2",
    pending: "bg-amber-100  text-amber-600 px-2 py-1 rounded-xl",
    rejected: "bg-red-100 text-red-600 px-2 py-1 rounded-xl",
  }[status];
}
