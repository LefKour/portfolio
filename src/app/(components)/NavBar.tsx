import Link from "next/link";

const NavBar = () => {
    return (
      <div className='fixed top-0 left-0 w-screen flex justify-center drop-shadow-xl backdrop-blur-xl z-50 border-b-[0.01rem] border-white'>
          <div className='w-full p-2 h-full flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl rounded-lg'>
              <Link href='/' className='p-2 border border-transparent hover:border-white hover:rounded-sm hover:bg-white/10'>Home</Link>
              <Link href='/about' className='p-2 border border-transparent hover:border-white hover:rounded-sm hover:bg-white/10'>About</Link>
              <Link href='/projects' className='p-2 border border-transparent hover:border-white hover:rounded-sm hover:bg-white/10'>Projects</Link>
              <Link href='/lab' className='p-2 border border-transparent hover:border-white hover:rounded-sm hover:bg-white/10'>Lab</Link>
              <Link href='/contact' className='p-2 border border-transparent hover:border-white hover:rounded-sm hover:bg-white/10'>Contact</Link>
          </div>
      </div>
    );
}

export default NavBar;