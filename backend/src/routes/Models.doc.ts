/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - id
 *         - email
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *         name:
 *           type: string
 *           description: The user name
 *         services:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserService'
 *         area:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Area'
 *         notif:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Notification'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *       example:
 *         id: 1
 *         email: john.doe@example.com
 *         password: secret
 *         name: John Doe
 *         createdAt: 2024-01-01T00:00:00Z
 *         updatedAt: 2024-01-01T00:00:00Z
 *
 *     UserService:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - serviceName
 *         - accessToken
 *         - refreshToken
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The user service ID
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the service
 *         serviceName:
 *           type: string
 *           description: The name of the service
 *         accessToken:
 *           type: string
 *           description: The access token for the service
 *         refreshToken:
 *           type: string
 *           description: The refresh token for the service
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *       example:
 *         id: 1
 *         userId: 1
 *         serviceName: google
 *         accessToken: ya29.a0AfH6SMBEzFZ4f7oV2Ic
 *         refreshToken: 1//0gYgh3NOB8
 *         createdAt: 2024-01-01T00:00:00Z
 *         updatedAt: 2024-01-01T00:00:00Z
 *
 *     Action:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - service
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The action ID
 *         name:
 *           type: string
 *           description: The name of the action
 *         description:
 *           type: string
 *           description: The description of the action
 *         service:
 *           type: string
 *           description: The service associated with the action
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *       example:
 *         id: 1
 *         name: new_push
 *         description: Triggers when a new push event occurs on GitHub repository
 *         service: github
 *         createdAt: 2024-01-01T00:00:00Z
 *         updatedAt: 2024-01-01T00:00:00Z
 *
 *     Reaction:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - service
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The reaction ID
 *         name:
 *           type: string
 *           description: The name of the reaction
 *         description:
 *           type: string
 *           description: The description of the reaction
 *         service:
 *           type: string
 *           description: The service associated with the reaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *       example:
 *         id: 1
 *         name: send_message
 *         description: Sends a message on discord webhook channel
 *         service: discord
 *         createdAt: 2024-01-01T00:00:00Z
 *         updatedAt: 2024-01-01T00:00:00Z
 *
 *     Area:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - description
 *         - actionId
 *         - reactionId
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The area ID
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the area
 *         name:
 *           type: string
 *           description: The name of the area
 *         description:
 *           type: string
 *           description: The description of the area
 *         actionId:
 *           type: integer
 *           description: The ID of the associated action
 *         reactionId:
 *           type: integer
 *           description: The ID of the associated reaction
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *       example:
 *         id: 1
 *         userId: 1
 *         name: Github Push Notification
 *         description: Sends a message on discord webhook channel when a new push event occurs on GitHub repository
 *         actionId: 1
 *         reactionId: 1
 *         createdAt: 2024-01-01T00:00:00Z
 *         updatedAt: 2024-01-01T00:00:00Z
 *
 *     Notification:
 *       type: object
 *       required:
 *         - id
 *         - userId
 *         - title
 *         - description
 *         - type
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: integer
 *           description: The notification ID
 *         userId:
 *           type: integer
 *           description: The ID of the user associated with the notification
 *         title:
 *           type: string
 *           description: The title of the notification
 *         description:
 *           type: string
 *           description: The description of the notification
 *         type:
 *           type: string
 *           description: The type of the notification
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 *       example:
 *         id: 1
 *         userId: 1
 *         title: new email
 *         description: You have received a new email
 *         type: email
 *         createdAt: 2024-01-01T00:00:00Z
 *         updatedAt: 2024-01-01T00:00:00Z
 */
