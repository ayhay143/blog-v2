"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { AnimatedToolbar } from "./animated-toolbar"

interface RichTextEditorProps {
  placeholder?: string
  minHeight?: number
  maxHeight?: number
  className?: string
  onChange?: (content: string, plainText: string) => void
  defaultValue?: string
}

export const RichTextEditor = ({
  placeholder = "Type your reply...",
  minHeight = 150,
  maxHeight = 600,
  className,
  onChange,
  defaultValue = "",
}: RichTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set())
  const [textAlign, setTextAlign] = useState("left")
  const [currentFontFamily, setCurrentFontFamily] = useState("Arial, sans-serif")
  const [currentHeading, setCurrentHeading] = useState("div")
  const [isResizing, setIsResizing] = useState(false)
  const [startY, setStartY] = useState(0)
  const [startHeight, setStartHeight] = useState(0)

  // Initialize editor
  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    // Set initial content
    if (defaultValue) {
      editor.innerHTML = defaultValue
    }

    // Set initial styles
    editor.style.minHeight = `${minHeight}px`
    editor.style.maxHeight = `${maxHeight}px`
  }, [defaultValue, minHeight, maxHeight])

  // Handle format commands
  const handleFormat = useCallback(
    (command: string, value?: string) => {
      const editor = editorRef.current
      if (!editor) return

      editor.focus()

      try {
        document.execCommand(command, false, value)
        updateActiveFormats()

        // Trigger onChange with both HTML and plain text
        if (onChange) {
          const htmlContent = editor.innerHTML
          const plainText = editor.innerText || editor.textContent || ""
          onChange(htmlContent, plainText)
        }
      } catch (error) {
        console.error("Format command failed:", error)
      }
    },
    [onChange],
  )

  // Update active formats based on current selection
  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>()

    try {
      if (document.queryCommandState("bold")) formats.add("bold")
      if (document.queryCommandState("italic")) formats.add("italic")
      if (document.queryCommandState("underline")) formats.add("underline")
      if (document.queryCommandState("strikeThrough")) formats.add("strikeThrough")
      if (document.queryCommandState("insertUnorderedList")) formats.add("insertUnorderedList")
      if (document.queryCommandState("insertOrderedList")) formats.add("insertOrderedList")

      // Check alignment
      if (document.queryCommandState("justifyLeft")) setTextAlign("left")
      else if (document.queryCommandState("justifyCenter")) setTextAlign("center")
      else if (document.queryCommandState("justifyRight")) setTextAlign("right")
      else setTextAlign("left")

      // Check font family
      const fontFamily = document.queryCommandValue("fontName") || "Arial, sans-serif"
      setCurrentFontFamily(fontFamily)

      // Check current block format
      const formatBlock = document.queryCommandValue("formatBlock").toLowerCase()
      if (formatBlock.includes("h1")) setCurrentHeading("h1")
      else if (formatBlock.includes("h2")) setCurrentHeading("h2")
      else if (formatBlock.includes("h3")) setCurrentHeading("h3")
      else if (formatBlock.includes("h4")) setCurrentHeading("h4")
      else if (formatBlock.includes("h5")) setCurrentHeading("h5")
      else if (formatBlock.includes("h6")) setCurrentHeading("h6")
      else setCurrentHeading("div")
    } catch (error) {
      console.error("Query command state failed:", error)
    }

    setActiveFormats(formats)
  }, [])

  // Handle selection change
  const handleSelectionChange = useCallback(() => {
    updateActiveFormats()
  }, [updateActiveFormats])

  // Handle input
  const handleInput = useCallback(() => {
    const editor = editorRef.current
    if (!editor || !onChange) return

    const htmlContent = editor.innerHTML
    const plainText = editor.innerText || editor.textContent || ""
    onChange(htmlContent, plainText)
  }, [onChange])

  // Handle keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        const form = editorRef.current?.closest("form")
        if (form) {
          form.requestSubmit()
        }
      }

      // Handle common shortcuts
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            handleFormat("bold")
            break
          case "i":
            e.preventDefault()
            handleFormat("italic")
            break
          case "u":
            e.preventDefault()
            handleFormat("underline")
            break
        }
      }
    },
    [handleFormat],
  )

  // Resize functionality
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsResizing(true)
      setStartY(e.clientY)
      setStartHeight(editorRef.current?.offsetHeight || minHeight)
    },
    [minHeight],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return

      const deltaY = e.clientY - startY
      const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY))

      if (editorRef.current) {
        editorRef.current.style.height = `${newHeight}px`
      }
    },
    [isResizing, startY, startHeight, minHeight, maxHeight],
  )

  const handleMouseUp = useCallback(() => {
    setIsResizing(false)
  }, [])

  // Add event listeners
  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    const handleMouseUpEditor = () => updateActiveFormats()
    const handleKeyUpEditor = () => updateActiveFormats()

    editor.addEventListener("mouseup", handleMouseUpEditor)
    editor.addEventListener("keyup", handleKeyUpEditor)
    document.addEventListener("selectionchange", handleSelectionChange)

    return () => {
      editor.removeEventListener("mouseup", handleMouseUpEditor)
      editor.removeEventListener("keyup", handleKeyUpEditor)
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [updateActiveFormats, handleSelectionChange])

  // Add resize event listeners
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "ns-resize"
      document.body.style.userSelect = "none"

      return () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        document.body.style.cursor = ""
        document.body.style.userSelect = ""
      }
    }
  }, [isResizing, handleMouseMove, handleMouseUp])

  return (
    <div
      ref={containerRef}
      className={cn("w-full divide-y overflow-hidden rounded-t-xl border border-b-0 bg-background shadow-sm ", className)}
    >
      <AnimatedToolbar
        onFormat={handleFormat}
        activeFormats={activeFormats}
        textAlign={textAlign}
        currentFontFamily={currentFontFamily}
        currentHeading={currentHeading}
      />

      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className={cn(
            "w-full resize-none rounded-none border-none p-6 shadow-none outline-none ring-0 focus-visible:ring-0 overflow-y-auto",
            "prose prose-sm max-w-none",
            "[&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-4",
            "[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-3",
            "[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2",
            "[&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-3 [&_h4]:mb-2",
            "[&_h5]:text-base [&_h5]:font-semibold [&_h5]:mt-3 [&_h5]:mb-2",
            "[&_h6]:text-sm [&_h6]:font-semibold [&_h6]:mt-2 [&_h6]:mb-1",
            "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-4",
            "[&_ul]:list-disc [&_ul]:ml-6 [&_ul]:my-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:my-2",
            "[&_li]:my-1",
            "[&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800",
            "[&_p]:my-2",
            "empty:before:content-[attr(data-placeholder)] empty:before:text-gray-400 empty:before:pointer-events-none",
          )}
          data-placeholder={placeholder}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          suppressContentEditableWarning={true}
          style={{ minHeight: `${minHeight}px`, maxHeight: `${maxHeight}px` }}
        />

        {/* Resize Handle */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-ns-resize bg-gray-300 hover:bg-gray-400 transition-colors"
          onMouseDown={handleMouseDown}
          style={{
            clipPath: "polygon(100% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </div>
    </div>
  )
}
