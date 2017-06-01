using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Com.Reactlibrary.RNInfiniteListview
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNInfiniteListviewModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNInfiniteListviewModule"/>.
        /// </summary>
        internal RNInfiniteListviewModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNInfiniteListview";
            }
        }
    }
}
