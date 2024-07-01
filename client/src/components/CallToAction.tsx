import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center justify-center rounded-ee-3xl rounded-ss-3xl border border-black p-4 text-center dark:border-slate-100 sm:flex-row">
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="text-2xl">Liked the app?</h2>
        <p className="my-2 text-gray-500 dark:text-gray-400">
          Checkout this social media app created by the same creator!
        </p>

        <Button
          className="place-self-center self-center"
          gradientDuoTone={"purpleToPink"}
        >
          <a href="https://connectiongram.netlify.app/" target="_blank">
            Check it out!
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img src="/calltoaction.png" loading="lazy" alt="social media app" />
      </div>
    </div>
  );
}
