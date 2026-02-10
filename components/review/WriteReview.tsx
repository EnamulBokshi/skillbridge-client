import React from 'react'
import { useConfirm } from '../modules/common/ConfirmDialog'
import { Button } from '../ui/button'
import { useForm } from '@tanstack/react-form'
import * as z from 'zod'
import { Field, FieldGroup, FieldLabel } from '../ui/field'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Star } from 'lucide-react'
import { Select, SelectTrigger } from '../ui/select'
import { SelectContent, SelectGroup, SelectItem, SelectValue } from '@radix-ui/react-select'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
    rating: z.string().min(1, "Rating is required!"),
    comment: z.string().min(5, "Comment must be at least 5 characters!"),
})
export default function WriteReview({ tutorId }: { tutorId: string }) {
    
    
    const form = useForm({
        defaultValues:{
            rating: '1',
            comment: '',
        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({value})=> {
            // Handle review submission logic here
            console.log("Submitting review for tutor:", tutorId);
            console.log("Rating:", value.rating);
            console.log("Comment:", value.comment);
        }
    })
 
  return (
    // <div>
    //     <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
    //     <form className="space-y-4" onSubmit={(e)=> {
    //         e.preventDefault();
    //         form.handleSubmit()
    //     }}>
            
            
    //     <Field>

    //     </Field>
    //         <div>
    //             <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
    //                 Rating
    //             </label>
    //             <select
    //                 id="rating"
    //                 name="rating"
    //                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //             >
    //                 <option value="">Select a rating</option>
    //                 <option value="5">5 - Excellent</option>
    //                 <option value="4">4 - Good</option>
    //                 <option value="3">3 - Average</option>
    //                 <option value="2">2 - Poor</option>
    //                 <option value="1">1 - Terrible</option>
    //             </select>
    //         </div>

    //         <div>
    //             <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
    //                 Comment
    //             </label>
    //             <textarea
    //                 id="comment"
    //                 name="comment"
    //                 rows={4}
    //                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    //                 placeholder="Write your review here..."
    //             />
    //         </div>

    //         <Button type="submit" onClick={handleSubmit}>
    //             Submit Review
    //         </Button>
    //     </form>
    // </div>
    <Card>
        <CardHeader>
            <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
        </CardHeader>
        <CardContent>
            <form className="space-y-4" onSubmit={(e)=> {
                e.preventDefault();
                form.handleSubmit()
            }}>
                <FieldGroup>
                    <form.Field 
                    name='rating'
                    children={()=> {
                        
                        return(
                            <Field>
                                <FieldLabel>Rating <Star className='inline'/></FieldLabel>
                                <Select>
                                    <SelectTrigger  className='w-full max-w-48'>
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="5">5 - Excellent</SelectItem>
                                            <SelectItem value="4">4 - Good</SelectItem>
                                            <SelectItem value="3">3 - Average</SelectItem>
                                            <SelectItem value="2">2 - Poor</SelectItem>
                                            <SelectItem value="1">1 - Terrible</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )
                    }}
                    
                    />

                    <form.Field 
                    name='comment'
                    children={()=> {
                        return(
                            <Field>
                                <FieldLabel>Comment</FieldLabel>
                                <Textarea placeholder='Write your review here...' />
                            </Field>
                        )
                    }}
                    
                    />
                </FieldGroup>
            </form>
        </CardContent>
    </Card>
  )
}
