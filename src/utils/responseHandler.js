class ResponseHandler {
  /**
   * Mengirim respons sukses
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Pesan respons
   * @param {*} data - Data yang akan dikirim (opsional)
   */
  static success(res, statusCode = 200, message = "Success", data = null) {
    return res.status(statusCode).json({
      success: true,
      message,
      data: data || undefined,
    });
  }

  /**
   * Mengirim respons error
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Pesan error
   * @param {*} error - Detail error (opsional)
   */
  static error(
    res,
    statusCode = 500,
    message = "Internal Server Error",
    error = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      error: error || undefined,
    });
  }

  /**
   * Menangani respons untuk not found
   * @param {Object} res - Express response object
   * @param {string} resourceName - Nama sumber daya yang tidak ditemukan
   */
  static notFound(res, resourceName = "Resource") {
    return res.status(404).json({
      success: false,
      message: `${resourceName} not found`,
    });
  }

  /**
   * Menangani respons untuk bad request
   * @param {Object} res - Express response object
   * @param {string} message - Pesan kesalahan
   */
  static badRequest(res, message = "Bad Request") {
    return res.status(400).json({
      success: false,
      message,
    });
  }

  /**
   * Menangani respons untuk validasi error
   * @param {Object} res - Express response object
   * @param {Object} validationErrors - Objek kesalahan validasi
   */
  static validationError(res, validationErrors) {
    return res.status(422).json({
      success: false,
      message: "Validation Error ",
      errors: validationErrors,
    });
  }
}

module.exports = ResponseHandler;
