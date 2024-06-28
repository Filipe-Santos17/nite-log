export default function formatDate(dateString: string, opt: "date" | "hour") {
  if (isValidDate(dateString)) {
    const data = new Date(dateString);

    function makeHour(){
      const hours = data.toLocaleTimeString().replace(/\s?(AM|PM)/g, "").split(":")
      return `${hours[0]}:${hours[1]}`
    }

    const timeView = {
      date: data.toLocaleDateString("pt-br"),
      hour: makeHour(),
    };

    return timeView[opt] || "-";
  }

  return "-";
}

function isValidDate(date: string) {
  const DateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

  return DateRegex.test(date);
}
