import { useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useLanguage } from '../App';
import { getTranslation } from './translations';

const languages = [
  { code: 'english', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hindi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'gujarati', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    if (['english', 'hindi', 'gujarati'].includes(languageCode)) {
      setLanguage(languageCode as 'english' | 'hindi' | 'gujarati');
      setIsOpen(false);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 hover:bg-accent/50 transition-colors"
        >
          <Globe className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{currentLanguage.flag} {currentLanguage.nativeName}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
          <ChevronDown className="w-4 h-4 ml-1 transition-transform" style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 rounded-xl">
        <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground border-b border-border mb-1">
          {getTranslation(language, 'language')}
        </div>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="rounded-lg cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center">
                <span className="mr-3 text-lg">{lang.flag}</span>
                <div>
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-muted-foreground">{lang.name}</div>
                </div>
              </div>
              {language === lang.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}