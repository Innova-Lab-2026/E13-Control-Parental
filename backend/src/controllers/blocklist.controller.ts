import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { db, BlocklistItem } from '../config/db';
import { AuthRequest } from '../middleware/auth.middleware';

export const getBlocklist = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    // Official LOTBA domains + custom domains added by this responsible
    const items = db.blocklist.filter(
      item => item.type === 'LOTBA_OFFICIAL' || item.addedBy === responsibleId
    );
    return res.status(200).json({ blocklist: items });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const addCustomBlocklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const cleanDomain = domain.toLowerCase().trim();

    const existing = db.blocklist.find(item => item.domain === cleanDomain);
    if (existing) {
      return res.status(400).json({ error: 'Domain is already in the blocklist' });
    }

    const newItem: BlocklistItem = {
      id: uuidv4(),
      domain: cleanDomain,
      type: 'CUSTOM',
      addedBy: responsibleId,
      createdAt: new Date().toISOString()
    };

    db.blocklist.push(newItem);

    return res.status(201).json({
      message: 'Custom domain added to blocklist successfully',
      item: newItem
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const removeCustomBlocklistItem = async (req: AuthRequest, res: Response) => {
  try {
    const responsibleId = req.responsibleId;
    const { id } = req.params;

    const index = db.blocklist.findIndex(
      item => item.id === id && item.type === 'CUSTOM' && item.addedBy === responsibleId
    );

    if (index === -1) {
      return res.status(404).json({ error: 'Custom blocklist item not found or unauthorized' });
    }

    const removed = db.blocklist.splice(index, 1);

    return res.status(200).json({
      message: 'Custom blocklist item removed successfully',
      item: removed[0]
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};

export const checkDomain = async (req: Request, res: Response) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const cleanDomain = domain.toLowerCase().trim();
    const matchedItem = db.blocklist.find(item => cleanDomain.includes(item.domain));

    return res.status(200).json({
      domain: cleanDomain,
      isBlocked: !!matchedItem,
      matchType: matchedItem ? matchedItem.type : null
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
};
