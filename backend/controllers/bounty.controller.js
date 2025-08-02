import Bounty from '../models/bounty.model.js';
import User from '../models/user.model.js';
import solanaService from '../services/solana.service.js';

// Create a new bounty
export const createBounty = async (req, res) => {
    try {
        const {
            title,
            description,
            reward,
            category,
            difficulty,
            deadline,
            requirements,
            attachments,
            tags,
            isOnChain
        } = req.body;

        const createdBy = req.walletAddress; // From authenticated session

        if (!title || !description || !reward || !category || !difficulty || !deadline) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const bounty = await Bounty.create({
            title,
            description,
            reward,
            category,
            difficulty,
            createdBy,
            deadline: new Date(deadline),
            requirements: requirements || [],
            attachments: attachments || [],
            tags: tags || [],
            isOnChain: isOnChain || false
        });

        // Optional: Create bounty on-chain
        if (isOnChain) {
            const onChainResult = await solanaService.createBountyOnChain(bounty);
            if (onChainResult.success) {
                bounty.onChainTxHash = onChainResult.transactionHash;
                await bounty.save();
            }
        }

        return res.status(201).json({
            success: true,
            message: 'Bounty created successfully',
            data: bounty
        });
    } catch (error) {
        console.error('Error in createBounty:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get all bounties with filters
export const getAllBounties = async (req, res) => {
    try {
        const {
            status,
            category,
            difficulty,
            search,
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (status) filter.status = status;
        if (category) filter.category = category;
        if (difficulty) filter.difficulty = difficulty;
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;
        const bounties = await Bounty.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .populate('createdBy', 'wallet');

        const total = await Bounty.countDocuments(filter);

        return res.status(200).json({
            success: true,
            message: 'Bounties retrieved successfully',
            data: {
                bounties,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Error in getAllBounties:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get bounty by ID
export const getBountyById = async (req, res) => {
    try {
        const { id } = req.params;
        const bounty = await Bounty.findById(id);

        if (!bounty) {
            return res.status(404).json({
                success: false,
                message: 'Bounty not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Bounty retrieved successfully',
            data: bounty
        });
    } catch (error) {
        console.error('Error in getBountyById:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Update bounty
export const updateBounty = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const walletAddress = req.walletAddress;

        const bounty = await Bounty.findById(id);
        if (!bounty) {
            return res.status(404).json({
                success: false,
                message: 'Bounty not found'
            });
        }

        // Only creator or admin can update
        if (bounty.createdBy !== walletAddress && req.admin?.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this bounty'
            });
        }

        const updatedBounty = await Bounty.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Bounty updated successfully',
            data: updatedBounty
        });
    } catch (error) {
        console.error('Error in updateBounty:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Delete bounty
export const deleteBounty = async (req, res) => {
    try {
        const { id } = req.params;
        const walletAddress = req.walletAddress;

        const bounty = await Bounty.findById(id);
        if (!bounty) {
            return res.status(404).json({
                success: false,
                message: 'Bounty not found'
            });
        }

        // Only creator or superadmin can delete
        if (bounty.createdBy !== walletAddress && req.admin?.role !== 'superadmin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this bounty'
            });
        }

        await Bounty.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Bounty deleted successfully'
        });
    } catch (error) {
        console.error('Error in deleteBounty:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Submit solution to bounty
export const submitSolution = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, attachments } = req.body;
        const walletAddress = req.walletAddress;

        if (!description) {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }

        const bounty = await Bounty.findById(id);
        if (!bounty) {
            return res.status(404).json({
                success: false,
                message: 'Bounty not found'
            });
        }

        if (bounty.status !== 'active') {
            return res.status(400).json({
                success: false,
                message: 'Bounty is not active'
            });
        }

        // Check if user already submitted
        const existingSubmission = bounty.submissions.find(
            sub => sub.walletAddress === walletAddress
        );
        if (existingSubmission) {
            return res.status(400).json({
                success: false,
                message: 'You have already submitted a solution'
            });
        }

        bounty.submissions.push({
            walletAddress,
            description,
            attachments: attachments || []
        });

        await bounty.save();

        return res.status(201).json({
            success: true,
            message: 'Solution submitted successfully',
            data: bounty
        });
    } catch (error) {
        console.error('Error in submitSolution:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Review submission (admin only)
export const reviewSubmission = async (req, res) => {
    try {
        const { id, submissionId } = req.params;
        const { status, feedback } = req.body;
        const adminWallet = req.walletAddress;

        if (!status || !['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Valid status is required'
            });
        }

        const bounty = await Bounty.findById(id);
        if (!bounty) {
            return res.status(404).json({
                success: false,
                message: 'Bounty not found'
            });
        }

        const submission = bounty.submissions.id(submissionId);
        if (!submission) {
            return res.status(404).json({
                success: false,
                message: 'Submission not found'
            });
        }

        submission.status = status;
        submission.reviewedBy = adminWallet;
        submission.reviewedAt = new Date();
        submission.feedback = feedback;

        if (status === 'approved') {
            bounty.status = 'completed';
            bounty.assignedTo = submission.walletAddress;
            
            // Optional: Send reward on-chain
            if (bounty.isOnChain) {
                const rewardResult = await solanaService.rewardUserOnChain(
                    submission.walletAddress,
                    bounty.reward.amount,
                    bounty._id
                );
                if (rewardResult.success) {
                    // Log the on-chain reward transaction
                    console.log('Reward sent on-chain:', rewardResult.transactionHash);
                }
            }
        }

        await bounty.save();

        return res.status(200).json({
            success: true,
            message: 'Submission reviewed successfully',
            data: bounty
        });
    } catch (error) {
        console.error('Error in reviewSubmission:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Get user's bounties
export const getUserBounties = async (req, res) => {
    try {
        const walletAddress = req.walletAddress;
        const { type = 'created' } = req.query; // 'created' or 'submitted'

        let filter = {};
        if (type === 'created') {
            filter.createdBy = walletAddress;
        } else if (type === 'submitted') {
            filter['submissions.walletAddress'] = walletAddress;
        }

        const bounties = await Bounty.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'User bounties retrieved successfully',
            data: bounties
        });
    } catch (error) {
        console.error('Error in getUserBounties:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}; 