import React from 'react'
import HeaderLogo from './HeaderLogo'


const Footer = () => {
  return (
    <div>
        
 <footer class="footer bg-black text-gray-600 body-font" >
  <div class="container px-5 py-14 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    <div class="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
      <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
      <HeaderLogo />
      </a>
    </div>
    <div class="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
      <div class="lg:w-1/3 md:w-1/2 w-full px-12">
      <h2 class="title-font font-large text-white tracking-widest text-xl mb-3">Connect</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="title-font font-medium text-white tracking-widest text-xlm mb-3" href='https://twitter.com/codewithvoid'>Twitter</a>
          </li>
          <li class="pt-3">
            <a class="title-font font-medium text-white tracking-widest text-sm mb-3" href='https://github.com/codewithvoid/AskDevs/blob/main/CODE_OF_CONDUCT.md'>Code of Conduct</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/3 md:w-1/2 w-full px-2">
      <h2 class="title-font font-large text-white tracking-widest text-xl mb-3">Contribute</h2>
        <nav class="list-none mb-10">
          <li>
            <a class="title-font font-medium text-white tracking-widest text-xlm mb-3" href='https://github.com/codewithvoid/AskDevs'>Github</a>
          </li>
        </nav>
      </div>
      <div class="lg:w-1/4 md:w-1/6 w-full px-2">
        <nav class="list-none mb-1">
            <img src='./footer-img.png'></img>
            <li>
            <a class="title-font font-medium text-white tracking-widest text-sm mb-3">Contact : askdevsorg@gmail.com</a> </li>
        </nav>
      </div>
    </div>
  </div>
  <div class="bg-grey-900 text-center">
    <div class="container mx-auto py-4 px-8 flex flex-wrap flex-col sm:flex-row">
      <p class=" text-gray-500 text-sm text-center sm:text-left">© Copyright 2023 -  <a href="https://twitter.com/codewithvoid" rel="noopener noreferrer" class="text-gray-500 ml-1" target="_blank">@AskDevs</a></p>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer