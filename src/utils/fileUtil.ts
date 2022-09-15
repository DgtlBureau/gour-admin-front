export function downloadFileFromUrl(url: string, name: string) {
  const link = document.createElement('a');

  link.href = url;

  link.setAttribute('download', name);

  document.body.appendChild(link);

  link.click();

  link.parentNode?.removeChild(link);
}

export function downloadFile(file: File, name: string) {
  const url = window.URL.createObjectURL(new Blob([file]));

  downloadFileFromUrl(url, name);
}
