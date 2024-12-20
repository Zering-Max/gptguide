'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getExistingTour,
  generateTourResponse,
  createNewTour,
  fetchUserTokensById,
  subtractTokens,
} from '@/utils/actions';
import { useAuth } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import TourInfo from './TourInfo';

const NewTour = () => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { mutate, isPending, data: tour } = useMutation({
    mutationFn: async (destination) => {
      const existingTour = await getExistingTour(destination);
      if (existingTour) return existingTour;
      const currentTokens = await fetchUserTokensById(userId);
      if (currentTokens < 300) {
        // 'Token balance is too low...'
        toast.error('Votre nombre de tokens est trop faible...',{
          duration: 5000 },);
        return;
      }
      const newTour = await generateTourResponse(destination);
      if (!newTour) {
        // 'No matching city found...'
        toast.error('Pas de ville correspondante trouvée...',{
          duration: 5000 },);
        return null;  
      }
      const response =  await createNewTour(newTour.tour);
      queryClient.invalidateQueries({ queryKey:['tours']});
      const newTokens = await subtractTokens(userId, newTour.usedTokens)
      return newTour.tour;
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const destination = Object.fromEntries(formData.entries());
    console.log(destination);
    mutate(destination);
  }

  if (isPending) {
    return <span className="loading loading-lg"></span>;
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="mb-4">
          {/* Select your dream destination */}
          Selectionnez votre destination de rêve
        </h2>
        <div className="join w-full">
          <input type="text" className="input input-bordered join-item w-full"
          placeholder="ville" name="city" required />
          <input type="text" className="input input-bordered join-item w-full"
          placeholder="pays" name="country" required />
          <button className="btn btn-primary join-item" type="submit">
            {/* generate tour */}
            générez un voyage
          </button>
        </div>
      </form>
      <div className="mt-16">
        { tour ? <TourInfo tour={tour}/> : null }
      </div>
    </>
  )
}

export default NewTour;