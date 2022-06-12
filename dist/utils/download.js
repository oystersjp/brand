export const download = ({
  url,
  filename
}) => {
  const anchorEl = document.createElement('a');
  anchorEl.download = filename;
  anchorEl.href = url;
  anchorEl.target = '_blank';
  anchorEl.click();
};