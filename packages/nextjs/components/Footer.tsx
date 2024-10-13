import React from "react";

import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { useTargetNetwork } from "~~/hooks/scaffold-stark/useTargetNetwork";
import { useGlobalState } from "~~/services/store/store";
import { devnet, sepolia, mainnet } from "@starknet-react/chains";
import { Faucet } from "~~/components/scaffold-stark/Faucet";
import { FaucetSepolia } from "~~/components/scaffold-stark/FaucetSepolia";
import { BlockExplorerSepolia } from "./scaffold-stark/BlockExplorerSepolia";
import { BlockExplorer } from "./scaffold-stark/BlockExplorer";
import { Copyright, Twitter, Facebook, Linkedin, Instagram, CheckCircle } from 'lucide-react'

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(
    (state) => state.nativeCurrencyPrice,
  );
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === devnet.id;
  const isSepoliaNetwork = targetNetwork.id === sepolia.id;
  const isMainnetNetwork = targetNetwork.id === mainnet.id;

  return (
    
    <footer className="bg-card text-card-foreground mt-8 py-8 px-4">
        <div className="container mx-auto p-8 bg-base-100 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground">
                We are dedicated to revolutionizing intellectual property protection through blockchain technology. Our platform ensures secure, transparent, and efficient IP management for creators worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm  hover:underline">Discover Mediolano.app</a></li>
                <li><a href="#" className="text-sm  hover:underline">Register your Intellectual Property</a></li>
                <li><a href="#" className="text-sm  hover:underline">Documentation and Resources </a></li>
                <li><a href="#" className="text-sm  hover:underline">Support & Contact</a></li>
                <li><a href="#" className="text-sm  hover:underline">Privacy Policy, Terms of Use</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">App Features</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 " />
                  <span className="text-sm">Blockchain Security</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 " />
                  <span className="text-sm">Smart Contracts</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 " />
                  <span className="text-sm">Global IP Management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 " />
                  <span className="text-sm">Analytics Dashboard</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 " />
                  <span className="text-sm">Automated Licensing</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className=" hover:/80"><Twitter className="w-6 h-6" /></a>
                <a href="#" className=" hover:/80"><Facebook className="w-6 h-6" /></a>
                <a href="#" className=" hover:/80"><Linkedin className="w-6 h-6" /></a>
                <a href="#" className=" hover:/80"><Instagram className="w-6 h-6" /></a>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
                <form className="flex">
                  <input type="email" placeholder="Enter your email" className="flex-grow p-2 text-sm border border-input rounded-l-md bg-background" />
                  <button type="submit" className="bg-primary -foreground px-4 py-2 text-sm rounded-r-md hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">Powered by Starknet</p>
            <div className="flex items-center mt-4 md:mt-0">
              <Copyright className="w-4 h-4 mr-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Mediolano.app</p>
            </div>
          </div>
        </div>
      </footer>
    
    
  );
};
