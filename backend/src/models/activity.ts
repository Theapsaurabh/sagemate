import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  name: string;
  description?: string;
  duration?: number;
  difficulty?: number;
  feedback?: string;
  scheduledFor?: Date;
  timestamp: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  userId: mongoose.Types.ObjectId;
}

const activitySchema = new Schema({
  type: { 
    type: String, 
    required: true,
    enum: ['meditation', 'exercise', 'therapy', 'journaling', 'breathing', 'mindfulness']
  },
  name: { 
    type: String, 
    required: true 
  },
  description: String,
  duration: Number,
  difficulty: {
    type: Number,
    min: 1,
    max: 10
  },
  feedback: String,
  scheduledFor: Date,
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['scheduled', 'completed', 'cancelled'],
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


activitySchema.index({ userId: 1, timestamp: -1 });
activitySchema.index({ userId: 1, status: 1, scheduledFor: 1 });

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);