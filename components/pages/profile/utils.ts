export function getFormattedFollowers(followers: number) {
  if (followers >= 1e9) {
    const formattedString = (followers / 1e9).toString();
    let decimal = formattedString.indexOf('.');
    if (decimal === -1) decimal = 3;
    return (
      formattedString.substring(0, decimal === 3 ? decimal : decimal + 2) + 'B'
    );
  }
  if (followers >= 1e6) {
    const formattedString = (followers / 1e6).toString();
    let decimal = formattedString.indexOf('.');
    if (decimal === -1) decimal = 3;
    return (
      formattedString.substring(0, decimal === 3 ? decimal : decimal + 2) + 'M'
    );
  }
  if (followers >= 1e4) {
    const formattedString = (followers / 1e3).toString();
    let decimal = formattedString.indexOf('.');
    if (decimal === -1) decimal = 3;
    return (
      formattedString.substring(0, decimal === 3 ? decimal : decimal + 2) + 'K'
    );
  }
  return followers.toLocaleString();
}
