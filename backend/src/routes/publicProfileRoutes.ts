import { Router, type Request, type Response } from 'express';
import { db } from '../db/database.js';

const router = Router();

// GET /api/public/profile/:identifier
router.get('/profile/:identifier', (req: Request, res: Response) => {
  const identifier = req.params.identifier;
  const profile = db.getPublicProfileData(identifier);

  if (!profile) {
    res.status(404).json({
      error: {
        code: 'USER_NOT_FOUND',
        message: `Public profile for '${identifier}' was not found.`,
      },
    });
    return;
  }

  // If user set profile visibility to private, honor it
  if (profile.visibility === 'private') {
    res.json({
      isPrivate: true,
      id: profile.id,
      handle: profile.handle,
      name: profile.name,
      avatarColor: profile.avatarColor,
      avatarMode: profile.avatarMode,
      certificates: profile.certificates, // certificates earned remain officially verifiable
      message: 'This user has set their profile visibility to private.',
    });
    return;
  }

  res.json({
    isPrivate: false,
    ...profile,
  });
});

export default router;
