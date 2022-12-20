export default function formatDate(dateString) {
    var date = new Date(dateString);
    return date.toISOString().substring(0, 10);
}
