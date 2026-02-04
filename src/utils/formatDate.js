/*
this helper ensures that all dates in the application are shown
in the same dd/mm/yyyy format.

we do NOT use toLocaleDateString() because that depends on the
users browser region. this would cause the dates to appear
differently for the examiner compared to how they appear for me.

by manually formatting the date, we guarantee consistency
everywhere dates are displayed in the app.
*/

export function formatDate(dateString) {
  const date = new Date(dateString);

  // extract day, month and year and make sure they always have two digits
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  // here i return the final formatted date string

  return `${day}/${month}/${year}`;
}
