import { Request, Response } from 'express';
import { prisma } from '../config/prisma';


export async function getNotifications(req : Request, res : Response) {
    const userId = Number(req.params.userId);

    try {
        const notification = await prisma.notification.findUnique({
            where: {
                id: userId
            }
        });

        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        } else {
            res.status(200).json(notification);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};

export async function deleteNotification(req : Request, res : Response) {
    const id = Number(req.params.id);

    try {
        const notification = await prisma.notification.findUnique({
            where: {
                id: id
            }
        });
        if (!notification) {
            return res.status(404).json({ error: 'Notification not found' });
        } else {
            res.status(200).json(notification);
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
};