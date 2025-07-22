import Link from "next/link";

const NavBar = () => {
    return (
      <div className='absolute w-screen flex p-3 pt-8 gap-2 justify-center'>
          <Link href='/' className='p2 bg-red-500'>Home</Link>
          <Link href='/about' className='p2 bg-red-500'>About</Link>
          <Link href='/projects' className='p2 bg-red-500'>Projects</Link>
          <Link href='/lab' className='p2 bg-red-500'>Lab</Link>
          <Link href='/contact' className='p2 bg-red-500'>Contact</Link>
      </div>
    );
}

export default NavBar;