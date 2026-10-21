import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db, EventItem, AlertItem } from '../config/db';
import { AuthRequest } from '../middleware/auth.middleware';

export const recordEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { deviceId, eventType, domain, details } = req.body;

    if (!deviceId || !eventType || !details) {
      return res.status(400).json({ error: 'deviceId, eventType, and details are required' });
    }

    const device = db.devices.find(d => d.id === deviceId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }

    const newEvent: EventItem = {
      id: uuidv4(),
      deviceId,
      eventType,
      domain,
      details,
      timestamp: new Date().toISOString()
    };

    db.events.push(newEvent);

    // If it's a security event (Access attempt to blocked site, app install attempt, or bypass attempt), generate an alert for the responsible
    if (['ACCESS_ATTEMPT', 'APP_INSTALL_ATTEMPT', 'BYPASS_ATTEMPT'].includes(eventType)) {
      const alertMessage = eventType === 'ACCESS_ATTEMPT'
        ? `Intento de acceso bloqueado al sitio ${domain || 'restringido'} desde el dispositivo ${device.deviceName}.`
        : eventType === 'APP_INSTALL_ATTEMPT'
        ? `Intento de instalación de aplicación no autorizada detectado en el dispositivo ${device.deviceName}.`
        : `¡Alerta de seguridad! Intento de evasión o bypass detectado en el dispositivo ${device.deviceName}.`;

      const newAlert: AlertItem = {
        id: uuidv4(),
        responsibleId: device.responsibleId,
        deviceId: device.id,
        alertType: eventType,
        message: alertMessage,
        read: false,
        createdAt: new Date().toISOString()
      };

      db.alerts.push(newAlert);
    }

    return res.status(201).json({
      message: 'Event recorded successfully',
      event: newEvent
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getEvents = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const { deviceId } = req.query;

    const responsibleDevices = db.devices.filter(d => d.responsibleId === responsibleId);
    const deviceIds = responsibleDevices.map(d => d.id);

    let events = db.events.filter(e => deviceIds.includes(e.deviceId));

    if (deviceId) {
      events = events.filter(e => e.deviceId === deviceId);
    }

    return res.status(200).json({ events });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getAlerts = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const alerts = db.alerts.filter(a => a.responsibleId === responsibleId);
    return res.status(200).json({ alerts });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const markAlertRead = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const { id } = req.params;

    const alert = db.alerts.find(a => a.id === id && a.responsibleId === responsibleId);
    if (!alert) {
      return res.status(404).json({ error: 'Alert not found or unauthorized' });
    }

    alert.read = true;

    return res.status(200).json({
      message: 'Alert marked as read',
      alert
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
