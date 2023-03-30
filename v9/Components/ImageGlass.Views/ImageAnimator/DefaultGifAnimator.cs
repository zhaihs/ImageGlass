﻿/*
ImageGlass Project - Image viewer for Windows
Copyright (C) 2010 - 2023 DUONG DIEU PHAP
Project homepage: https://imageglass.org

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


/******************************************
* THANKS [Meowski] FOR THIS CONTRIBUTION
*******************************************/

using ImageGlass.Base.Photoing.Codecs;

namespace ImageGlass.Views.ImageAnimator;

/// <summary>
/// This is a wrapper for the original System.Drawing animator.
/// See <see cref="System.Drawing.ImageAnimator"/>.
/// </summary>
public class DefaultGifAnimator : IImageAnimator
{

    /// <summary>
    /// Updates the time frame for this image.
    /// </summary>
    /// <param name="image"></param>
    public void UpdateFrames(Image? image)
    {
        System.Drawing.ImageAnimator.UpdateFrames(image);
    }

    /// <summary>
    /// Stops updating frames for the given image. 
    /// </summary>
    /// <param name="image"></param>
    /// <param name="eventHandler"></param>
    public void StopAnimate(Image? image, EventHandler eventHandler)
    {
        System.Drawing.ImageAnimator.StopAnimate(image, eventHandler);
    }

    /// <summary>
    /// Animates the given image. 
    /// </summary>
    /// <param name="image"></param>
    /// <param name="eventHandler"></param>
    public void Animate(Image? image, EventHandler eventHandler)
    {
        System.Drawing.ImageAnimator.Animate(image, eventHandler);
    }

    /// <summary>
    /// Determines whether an image can be animated.
    /// </summary>
    /// <param name="image"></param>
    /// <returns></returns>
    public bool CanAnimate(Image? image)
    {
        return System.Drawing.ImageAnimator.CanAnimate(image);
    }
}