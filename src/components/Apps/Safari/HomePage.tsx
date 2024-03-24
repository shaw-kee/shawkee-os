interface Bookmark {
  title: string;
  url: string;
  iconUrl: string;
}

const SAFARI_BOOKMARKS: Bookmark[] = [
  {
    title: 'Blog.minjong',
    url: 'https://blog.minjong.codes',
    iconUrl: 'src/assets/icons/Safari/blog-minjong.png',
  },
  {
    title: 'Woong.log',
    url: 'https://blog.mckee.codes/',
    iconUrl: 'src/assets/icons/Safari/blog-minjong.png',
  },
];

interface HomepageProps {
  onClickBookmark: (url: string) => void;
}

const HomePage = ({ onClickBookmark }: HomepageProps) => {
  return (
    <div className='h-full w-full space-y-4 bg-slate-100 p-8'>
      <div className='text-lg font-bold'>Favorites</div>
      <div className='flex items-start justify-start gap-4'>
        {SAFARI_BOOKMARKS.map(({ title, url, iconUrl }) => (
          <button key={title} onClick={() => onClickBookmark(url)} className='w-16 active:opacity-90'>
            <div className='flex flex-col items-center gap-1.5'>
              <img src={iconUrl} className='h-16 w-16 rounded-lg shadow-lg' />
              <div className='break-all text-center text-sm leading-3'>{title}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
