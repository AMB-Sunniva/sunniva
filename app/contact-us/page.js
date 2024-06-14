import BookOnlineGallery from "@/components/BookOnline/BookOnlineGallery";
import RequestQuote from "@/components/Quote/RequestQuote";

export default function ContactUs() {
  return (
    <div>
      <RequestQuote />
      <div className='text-center pt-24 pb-12 bg-custom-light-gray'>
          <hr style={{width:'3%', borderColor: '#333', margin: '30px auto'}} />
          <h1 style={{fontSize: '2.5rem', fontWeight: 'lighter', color: '#474949', letterSpacing: '2px'}}>BOOK ONLINE</h1>
          <BookOnlineGallery />
      </div>
    </div>
  );
}
