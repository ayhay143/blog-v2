"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import {
  Bold,
  Italic,
  Link,
  Quote,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Palette,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ToolbarProps {
  onFormat: (command: string, value?: string) => void
  activeFormats: Set<string>
  textAlign: string
  currentFontFamily: string
  currentHeading: string
}

const ToolbarButton = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}: {
  label: string
  icon: React.ComponentType<{ className?: string }>
  isActive: boolean
  onClick: () => void
}) => (
  <div className="relative">
    <button
      type="button"
      className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors duration-200 ${
        isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
      } hover:bg-gray-100 focus:outline-none`}
      aria-label={label}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </button>
  </div>
)

export const AnimatedToolbar = ({
  onFormat,
  activeFormats,
  textAlign,
  currentFontFamily,
  currentHeading,
}: ToolbarProps) => {
  const handleFormat = (command: string, value?: string) => {
    onFormat(command, value)
  }

  const fontFamilies = [
    { value: "Arial, sans-serif", label: "Arial" },
    { value: "Georgia, serif", label: "Georgia" },
    { value: "Times New Roman, serif", label: "Times New Roman" },
    { value: "Helvetica, sans-serif", label: "Helvetica" },
    { value: "Verdana, sans-serif", label: "Verdana" },
    { value: "Courier New, monospace", label: "Courier New" },
    { value: "Impact, sans-serif", label: "Impact" },
    { value: "Comic Sans MS, cursive", label: "Comic Sans MS" },
  ]

  const headingLevels = [
    { value: "div", label: "Normal Text" },
    { value: "h1", label: "Heading 1" },
    { value: "h2", label: "Heading 2" },
    { value: "h3", label: "Heading 3" },
    { value: "h4", label: "Heading 4" },
    { value: "h5", label: "Heading 5" },
    { value: "h6", label: "Heading 6" },
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-white border-b border-gray-200 flex items-center gap-2 p-2 flex-wrap"
      >
        {/* Font Family Selector */}
        <Select value={currentFontFamily} onValueChange={(value) => handleFormat("fontName", value)}>
          <SelectTrigger className="w-32 h-8 text-xs border-gray-300">
            <SelectValue placeholder="Font" />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map((font) => (
              <SelectItem key={font.value} value={font.value} className="text-xs">
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Heading Level Selector */}
        <Select value={currentHeading} onValueChange={(value) => handleFormat("formatBlock", `<${value}>`)}>
          <SelectTrigger className="w-28 h-8 text-xs border-gray-300">
            <SelectValue placeholder="Style" />
          </SelectTrigger>
          <SelectContent>
            {headingLevels.map((heading) => (
              <SelectItem key={heading.value} value={heading.value} className="text-xs">
                {heading.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Text Formatting Section */}
        <ToolbarButton
          label="Bold"
          icon={Bold}
          isActive={activeFormats.has("bold")}
          onClick={() => handleFormat("bold")}
        />
        <ToolbarButton
          label="Italic"
          icon={Italic}
          isActive={activeFormats.has("italic")}
          onClick={() => handleFormat("italic")}
        />
        <ToolbarButton
          label="Underline"
          icon={Underline}
          isActive={activeFormats.has("underline")}
          onClick={() => handleFormat("underline")}
        />
        <ToolbarButton
          label="Strikethrough"
          icon={Strikethrough}
          isActive={activeFormats.has("strikeThrough")}
          onClick={() => handleFormat("strikeThrough")}
        />

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Structure Section */}
        <ToolbarButton
          label="Quote"
          icon={Quote}
          isActive={activeFormats.has("blockquote")}
          onClick={() => handleFormat("formatBlock", "<blockquote>")}
        />
        <ToolbarButton
          label="Bullet List"
          icon={List}
          isActive={activeFormats.has("insertUnorderedList")}
          onClick={() => handleFormat("insertUnorderedList")}
        />
        <ToolbarButton
          label="Numbered List"
          icon={ListOrdered}
          isActive={activeFormats.has("insertOrderedList")}
          onClick={() => handleFormat("insertOrderedList")}
        />

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Text Alignment Section */}
        <ToolbarButton
          label="Align Left"
          icon={AlignLeft}
          isActive={textAlign === "left"}
          onClick={() => handleFormat("justifyLeft")}
        />
        <ToolbarButton
          label="Align Center"
          icon={AlignCenter}
          isActive={textAlign === "center"}
          onClick={() => handleFormat("justifyCenter")}
        />
        <ToolbarButton
          label="Align Right"
          icon={AlignRight}
          isActive={textAlign === "right"}
          onClick={() => handleFormat("justifyRight")}
        />

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300"></div>

        {/* Color and Highlight Section */}
        <ToolbarButton
          label="Link"
          icon={Link}
          isActive={activeFormats.has("createLink")}
          onClick={() => {
            const url = prompt("Enter URL:")
            if (url) handleFormat("createLink", url)
          }}
        />
        <ToolbarButton
          label="Highlight"
          icon={Highlighter}
          isActive={activeFormats.has("hiliteColor")}
          onClick={() => handleFormat("hiliteColor", "yellow")}
        />
        <ToolbarButton
          label="Text Color"
          icon={Palette}
          isActive={activeFormats.has("foreColor")}
          onClick={() => handleFormat("foreColor", "#3b82f6")}
        />
      </motion.div>
    </AnimatePresence>
  )
}
