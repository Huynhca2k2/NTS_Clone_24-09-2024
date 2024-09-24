export class FileUtils {
  /**
   * Get file extension from file name
   * @param file {File} File need get extension
   * @returns {string} File's extension
   */
   static GetFileExtension(file: File) : string {
    const arr = file.name.split('.');
    return arr[arr.length - 1];
  }
}
