import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
    type: string;
    name: string;
    description?: string;
    duration: number; // in minutes
    difficulty: number; // 1-10 scale
    feedback?: string;
    scheduledFor?: Date;
    timestamp: Date;
    status: 'completed' | 'scheduled' | 'cancelled';
    userId: mongoose.Types.ObjectId;
}

const ActivitySchema: Schema = new Schema({
    type: {
        type: String,
        required: true,
        enum: ['meditation', 'exercise', 'therapy', 'journaling', 'breathing', 'mindfulness', 'other']
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    duration: {
        type: Number,
        required: true,
        min: 1
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    feedback: {
        type: String,
        trim: true
    },
    scheduledFor: {
        type: Date,
        default: Date.now
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['completed', 'scheduled', 'cancelled'],
        default: 'completed'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Index for better query performance
ActivitySchema.index({ userId: 1, scheduledFor: 1 });
ActivitySchema.index({ userId: 1, status: 1 });
ActivitySchema.index({ userId: 1, timestamp: -1 });

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema);