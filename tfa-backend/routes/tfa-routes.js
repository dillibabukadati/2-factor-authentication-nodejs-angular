const express = require("express");
const tfaController = require("../controllers/tfa-controller");
const router = express.Router();
const {validateAuthorization}= require('../utils/auth-validation')
/**
 * @swagger
 * definitions:
 *   TFAValidateRequestBody:
 *     properties:
 *       otp:
 *          type: string
 *   TFAEnabledCheckRequestBody:
 *     properties:
 *       email:
 *          type: string
 *   BaseResponse:
 *      properties:
 *          status:
 *            type: number
 *          message:
 *            type: string
 *   TFAEnableResponseBody:
 *      properties:
 *          status:
 *            type: number
 *          message:
 *            type: string
 *          data:
 *            type: object
 *            properties:
 *              userId:
 *                type: string
 *              token:
 *                type: object
 *                properties:
 *                  otpAuthUrl:
 *                    type: string
 *                  base32:
 *                    type: string
 *                  qrCode:
 *                    type: string
 *   TFAEnabledCheckResponse:
 *      properties:
 *          status:
 *              type: number
 *          message:
 *              type: string
 *          isTFAEnabled:
 *              type: boolean
 */

/**
 * @swagger
 * /tfa/enable:
 *  post:
 *      tags:
 *        - TFA Management
 *      summary: Enable 2Factor Authentication for a user.
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: return success response with token details.
 *              content:
 *                  'application/json':
 *                     schema:
 *                        $ref: '#/definitions/TFAEnableResponseBody'
 *
 */
router.post("/enable", [validateAuthorization(), tfaController.enableTfa]);

/**
 * @swagger
 * /tfa/enabled:
 *  post:
 *      tags:
 *        - TFA Management
 *      summary: Enable 2Factor Authentication for a user.
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/TFAEnabledCheckRequestBody'
 *      responses:
 *          200:
 *              description: return success response with token details.
 *              content:
 *                  'application/json':
 *                     schema:
 *                        $ref: '#/definitions/TFAEnabledCheckResponse'
 *
 */
router.post("/enabled", tfaController.checkIfTFAEnabled);

/**
 * @swagger
 * /tfa/validate:
 *  post:
 *      tags:
 *        - TFA Management
 *      summary: Validate the Generated TFA Token.
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/TFAValidateRequestBody'
 *      responses:
 *          200:
 *              description: return success response with token details.
 *              content:
 *                  'application/json':
 *                     schema:
 *                        $ref: '#/definitions/BaseResponse'
 */
router.post("/validate", [validateAuthorization(), tfaController.validateTFA]);

/**
 * @swagger
 * /tfa/validate:
 *  post:
 *      tags:
 *        - TFA Management
 *      summary: Disable TFA for the logged-in user..
 *      produces:
 *          - application/json
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/TFAValidateRequestBody'
 *      responses:
 *          200:
 *              description: return success response with token details.
 *              content:
 *                  'application/json':
 *                     schema:
 *                        $ref: '#/definitions/BaseResponse'
 */
router.post("/disable", [validateAuthorization(), tfaController.disableTFA]);

module.exports = router;
