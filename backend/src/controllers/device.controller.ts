import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db, Device } from '../config/db';
import { AuthRequest } from '../middleware/auth.middleware';

export const linkDevice = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const { deviceName, deviceToken } = req.body;

    if (!deviceName || !deviceToken) {
      return res.status(400).json({ error: 'Device name and device token are required' });
    }

    const newDevice: Device = {
      id: uuidv4(),
      responsibleId: responsibleId!,
      deviceName,
      deviceToken,
      status: 'active',
      lastSeen: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    db.devices.push(newDevice);

    // Create an alert / log event for device linking
    db.alerts.push({
      id: uuidv4(),
      responsibleId: responsibleId!,
      deviceId: newDevice.id,
      alertType: 'DEVICE_LINKED',
      message: `Dispositivo protegido "${deviceName}" vinculado exitosamente.`,
      read: false,
      createdAt: new Date().toISOString()
    });

    return res.status(201).json({
      message: 'Device linked successfully',
      device: newDevice
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const getDevices = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const devices = db.devices.filter(d => d.responsibleId === responsibleId);
    return res.status(200).json({ devices });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const updateDeviceStatus = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be active or inactive' });
    }

    const device = db.devices.find(d => d.id === id && d.responsibleId === responsibleId);
    if (!device) {
      return res.status(404).json({ error: 'Device not found or unauthorized' });
    }

    device.status = status;
    device.lastSeen = new Date().toISOString();

    return res.status(200).json({
      message: 'Device status updated successfully',
      device
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
