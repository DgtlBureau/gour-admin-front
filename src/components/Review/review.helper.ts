export function getReviewStatus(isConfirmed: boolean | null) {
  switch (isConfirmed) {
    case true:
      return 'accept';
    case false:
      return 'reject';
    default:
      return 'init';
  }
}
