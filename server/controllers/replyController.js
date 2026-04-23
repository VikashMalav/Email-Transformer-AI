import Reply from '../models/Reply.js';
import * as aiService from '../services/aiService.js';

/**
 * POST /api/generate-reply
 * Handles AI generation flow via the Service Layer
 */
export async function generateReply(req, res) {
  const { email, tone } = req.body;

  if (!email || !tone) {
    return res.status(400).json({ success: false, message: 'Email and tone are required.' });
  }

  try {
    const generatedReply = await aiService.generateEmailResponse(email, tone);
    return res.status(200).json({ success: true, generatedReply });
  } catch (error) {
    console.error('[Controller] Generation Error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'AI Archtecture failed to respond.', 
      error: error.message 
    });
  }
}

/**
 * POST /api/save-reply
 * Handles database persistence
 */
export async function saveReply(req, res) {
  try {
    const { originalEmail, generatedReply, tone } = req.body;

    if (!originalEmail || !generatedReply) {
      return res.status(400).json({ success: false, message: 'Missing required persistence fields.' });
    }

    const newReply = await Reply.create({ 
      originalEmail, 
      generatedReply, 
      tone 
    });

    return res.status(201).json({ success: true, data: newReply });
  } catch (error) {
    console.error('[Controller] Save Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * GET /api/replies
 * Optimized fetching with .lean() and pagination limits
 */
export async function getReplies(req, res) {
  try {
    // Optimization: .lean() for faster, read-only performance
    // .limit(50) prevents frontend data overflow as history grows
    const replies = await Reply.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.status(200).json({ 
      success: true, 
      count: replies.length, 
      data: replies 
    });
  } catch (error) {
    console.error('[Controller] Fetch Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * DELETE /api/replies/:id
 * Deletes a specific history record
 */
export async function deleteReply(req, res) {
  try {
    const { id } = req.params;
    await Reply.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: 'Record removed.' });
  } catch (error) {
    console.error('[Controller] Delete Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * DELETE /api/replies
 * Permanently deletes all generated history
 */
export async function deleteAllHistory(req, res) {
  try {
    await Reply.deleteMany({});
    return res.status(200).json({ success: true, message: 'Archive successfully cleared.' });
  } catch (error) {
    console.error('[Controller] Delete All Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
