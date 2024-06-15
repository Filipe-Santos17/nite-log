export default function isItApproved(status: boolean | null) {
  if (typeof status === "boolean") {
    return status ? "Sim" : "Não";
  }

  return "-";
}
