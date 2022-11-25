export default milliseconds => {
    const seconds = Math.floor(milliseconds / 1000);
    const mins = Math.floor(seconds / 60);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    return `${days} days, ${hours % 24} hours, ${mins % 60} minutes, ${seconds % 60} seconds`;
}