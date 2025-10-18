'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { feedbackApi } from '@/lib/api'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

interface FeedbackModalProps {
  reportId: string
  isOpen: boolean
  onClose: () => void
}

export function FeedbackModal({ reportId, isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [useful, setUseful] = useState<boolean | null>(null)
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null)
  const [feedbackText, setFeedbackText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    if (rating === 0 || useful === null || wouldRecommend === null) {
      toast({
        title: 'Missing fields',
        description: 'Please complete all required fields',
      })
      return
    }

    setIsSubmitting(true)

    try {
      await feedbackApi.submit({
        report_id: reportId,
        rating,
        useful,
        would_recommend: wouldRecommend,
        feedback_text: feedbackText || undefined,
      })

      toast({
        title: 'Thank you!',
        description: 'Your feedback helps us improve StratAI',
      })

      onClose()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] overflow-y-auto rounded-lg bg-white p-6 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-xl font-semibold text-slate-900">
              Help Us Improve
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className="rounded-full p-1 hover:bg-slate-100">
                <X className="h-5 w-5 text-slate-600" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-6 space-y-6">
            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                How would you rate this analysis? *
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        'h-8 w-8',
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-slate-300'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Useful */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Was this analysis useful? *
              </label>
              <div className="flex gap-2">
                <Button
                  variant={useful === true ? 'default' : 'outline'}
                  onClick={() => setUseful(true)}
                  className="flex-1"
                >
                  Yes, very useful
                </Button>
                <Button
                  variant={useful === false ? 'default' : 'outline'}
                  onClick={() => setUseful(false)}
                  className="flex-1"
                >
                  Not useful
                </Button>
              </div>
            </div>

            {/* Would Recommend */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Would you recommend StratAI to a colleague? *
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={wouldRecommend === true ? 'default' : 'outline'}
                  onClick={() => setWouldRecommend(true)}
                >
                  Definitely
                </Button>
                <Button
                  variant={wouldRecommend === false ? 'default' : 'outline'}
                  onClick={() => setWouldRecommend(false)}
                >
                  Not likely
                </Button>
              </div>
            </div>

            {/* Additional Feedback */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Additional feedback (optional)
              </label>
              <Textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us more about your experience..."
                rows={4}
              />
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || rating === 0 || useful === null || wouldRecommend === null}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
